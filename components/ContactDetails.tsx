import { site } from "@/content/site";
import { Icon } from "@/components/Icon";

/* Email, phone (when set), service area and response time. Used in the
   footer, the contact section and the contact page. */
export function ContactDetails({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid gap-2 ${className}`}>
      <li className="t-body flex items-center gap-2">
        <Icon name="mail" className="shrink-0 text-brand" />
        <a href={`mailto:${site.email}`} className="text-ink hover:text-brand">
          {site.email}
        </a>
      </li>
      {site.phone && site.phoneDisplay ? (
        <li className="t-body flex items-center gap-2">
          <Icon name="phone" className="shrink-0 text-brand" />
          <a href={`tel:${site.phone}`} className="text-ink hover:text-brand">
            {site.phoneDisplay}
          </a>
        </li>
      ) : null}
      <li className="t-body flex items-center gap-2 text-ink-muted">
        <Icon name="map-pin" className="shrink-0 text-brand" />
        <span>
          {site.area} · {site.remote.toLowerCase()}
        </span>
      </li>
      <li className="t-body flex items-center gap-2 text-ink-muted">
        <Icon name="clock" className="shrink-0 text-brand" />
        <span>{site.responseTime}</span>
      </li>
    </ul>
  );
}
