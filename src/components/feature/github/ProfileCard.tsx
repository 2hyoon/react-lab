import { GitHubUser } from "@/src/types/interface";

const ProfileCard = ({
  user,
  className = "",
}: {
  user: GitHubUser;
  className?: string;
}) => {
  return (
    <article
      className={`flex items-center gap-4 p-4 rounded-lg bg-surface border border-border ${className}`}
    >
      <img
        src={user.avatar_url}
        alt=""
        width={64}
        height={64}
        className="w-16 h-16 rounded-full shrink-0"
      />
      <div className="min-w-0">
        <h2 className="truncate">{user.login}</h2>
        {user.bio && <p className="text-muted wrap-break-word">{user.bio}</p>}
      </div>
    </article>
  );
};

export default ProfileCard;
