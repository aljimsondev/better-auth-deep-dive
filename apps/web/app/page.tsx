"use client"

import { authClient } from "../lib/auth/auth-client";

function Home() {
  const {data:session, isPending:loading} = authClient.useSession()

  if(loading) return <div className="container">
    Loading...
  </div>

 return <div className="container mx-auto flex items-center justify-center h-[100dvh]">
  {session ? <div>
    Welcome
    <div>
      <button className="border-[1px] border-gray-700 p-4 rounded-md bg-red-600 hover:bg-red-600/80 duration-300 text-white" onClick={()=>authClient.signOut()}>Signout</button>
    </div>
  </div> : 
  <div>
   <div>
     Not logged in
   </div>
      <button className="border-[1px] border-gray-700 p-4 rounded-md bg-black hover:bg-black/80 duration-300 text-white">Sign in</button>
    </div>}
 </div>
}

export default Home;
