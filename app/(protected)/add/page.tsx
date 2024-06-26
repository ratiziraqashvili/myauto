import { PostForms } from "./_components/post-forms";

const AddPage = async () => {
  return (
    <div className="flex gap-4 lg:flex-row flex-col relative w-[90%] mx-auto md:w-[77%] lg:w-[75%] pb-20"> 
      <PostForms />
    </div>
  );
};

export default AddPage;
