import { Avatar, AvatarImage } from "./ui/avatar";

export const ProfilePicture = ({ className }: { className?: string }) => {
  return (
    <Avatar className={className}>
      <AvatarImage src="/profile.jpg" />
    </Avatar>
  );
};
