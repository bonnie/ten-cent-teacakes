type SocialLinkProps = {
  iconPath: string;
  target: string;
  label: string;
};

export const SocialLink: React.FC<SocialLinkProps> = ({
  iconPath,
  target,
  label,
}) => {
  return <button type="button"
  key={label}
  aria-label={label}
  title={label}
  color="primary"
  href={target}
  target="_blank"
  rel="noreferrer"
>
  <svg src={iconPath} />
</button>
);
};
