/*
  Sends mail through Microsoft Graph with an app registration
  (client credentials). Used by the consultation form server action.

  Requires an Entra app with the Mail.Send *application* permission,
  admin-consented, and ideally an Exchange application access policy
  that limits it to the sending mailbox.
*/

export type GraphMailConfig = {
  tenantId: string;
  clientId: string;
  clientSecret: string;
  /** The mailbox the app sends on behalf of, e.g. jbeese@ccbtec.com. */
  senderMailbox: string;
  /** Optional alias of that mailbox to show as the From address. */
  fromAddress?: string;
};

export type GraphMailMessage = {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
};

type CachedToken = { value: string; expiresAt: number };

let cachedToken: CachedToken | null = null;

async function getAccessToken(config: GraphMailConfig) {
  if (cachedToken && cachedToken.expiresAt - 60_000 > Date.now()) {
    return cachedToken.value;
  }

  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });

  const response = await fetch(
    `https://login.microsoftonline.com/${encodeURIComponent(
      config.tenantId,
    )}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    },
  );

  if (!response.ok) {
    throw new Error(
      `Graph token request failed (${response.status}): ${await response.text()}`,
    );
  }

  const data = (await response.json()) as {
    access_token: string;
    expires_in: number;
  };

  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return data.access_token;
}

export async function sendGraphMail(
  config: GraphMailConfig,
  message: GraphMailMessage,
) {
  const token = await getAccessToken(config);

  const payload = {
    message: {
      subject: message.subject,
      body: { contentType: "HTML", content: message.html },
      toRecipients: [{ emailAddress: { address: message.to } }],
      ...(message.replyTo
        ? { replyTo: [{ emailAddress: { address: message.replyTo } }] }
        : {}),
      ...(config.fromAddress
        ? { from: { emailAddress: { address: config.fromAddress } } }
        : {}),
    },
    saveToSentItems: true,
  };

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
      config.senderMailbox,
    )}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  // Graph answers 202 Accepted on success.
  if (!response.ok) {
    throw new Error(
      `Graph sendMail failed (${response.status}): ${await response.text()}`,
    );
  }
}
