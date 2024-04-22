import { auth } from "@/auth";

const AddPage = async () => {
    const session = await auth();

    return ( 
        <div>
            {JSON.stringify(session)}
        </div>
     );
}
 
export default AddPage;