import { useForm } from "react-hook-form";
import SocialProvider from "src/app/_components/social-provider";
import { Button } from "src/components/ui/button";
import { Card, CardContent } from "src/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { authClient } from "src/lib/auth/auth-client";

function LoginForm() {
  const form = useForm({
    defaultValues:{
      email:"",
      password:""
    }
  })

  const handleSignin=async(data:{email:string; password:string})=>{
    try{
      const response = await authClient.signIn.email(data);

      console.log(response)
    }catch(e:any){
      alert(e?.message)
    }
  }


  return (
    <Card>
      <CardContent>
        <form method="POST" onSubmit={form.handleSubmit(handleSignin)} className="space-y-8">
          <h1 className="text-3xl font-bold text-center">Login</h1>
      <Form {...form}>
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@email.test" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password..."  type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">Login</Button>
        <hr />
        <SocialProvider />
      </Form>
    </form>
      </CardContent>
    </Card>
  )
}

export default LoginForm