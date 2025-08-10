import { FaExternalLinkAlt } from "react-icons/fa"

const ExternalLink = (props: React.ComponentProps<"a">) => (
  <a
    className="text-link-color mx-0.5 inline-flex items-center gap-0.5 transition-colors"
    href={props.href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {props.children}
    <FaExternalLinkAlt size={12} />
  </a>
)

export default ExternalLink
