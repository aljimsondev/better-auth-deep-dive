"use client"

import { Fragment, useState } from "react";
import LoginForm from "src/app/_components/login.form";
import SignUpForm from "src/app/_components/signup.form";
import { Button } from "src/components/ui/button";
import { authClient } from "src/lib/auth/auth-client";



function Home() {
  const {data:session, isPending:loading} = authClient.useSession()
  const [activeTab,setActiveTab] = useState<"login" | "signup">("login")


  if(loading) return <div className="container">
    Loading...
  </div>

 return <div className="container mx-auto flex items-center justify-center h-[100dvh] px-4">
   <div className="min-w-full md:min-w-[500px] relative">
      {
        session ?
         <div className="w-full">
          <h1 className="text-3xl font-bold">Welcome {session.user.name}</h1>
          <Button variant="destructive" onClick={()=>authClient.signOut()}>Signout</Button>
        </div>
        : <Fragment>
          <div className="flex gap-2 w-full my-4">
      <Button className="flex-1" onClick={()=>setActiveTab("login")} variant="outline">Signin</Button>
      <Button className="flex-1" onClick={()=>setActiveTab("signup")} variant="outline">Sign Up</Button>
    </div>
       {
        activeTab==="login" ? <LoginForm /> : <SignUpForm />
      }
        </Fragment>
      }
   </div>
 </div>
}

export default Home;
