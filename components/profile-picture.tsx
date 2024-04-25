import { Avatar, AvatarImage } from "./ui/avatar";

export const ProfilePicture = ({ className }: { className?: string }) => {
  return (
    <Avatar className={className}>
      <AvatarImage src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1713744000&semt=ais" />
    </Avatar>
  );
};
