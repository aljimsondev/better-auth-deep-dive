import { Button } from 'src/components/ui/button';
import { authClient } from 'src/lib/auth/auth-client';

function SocialProvider() {
  const onSigninGithub = async () => {
    try {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: `${process.env.NEXT_PUBLIC_CLIENT_URL}/?signin=true&provider=github`,
      });
    } catch (e: any) {
      alert(e?.message);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <Button type="button" onClick={onSigninGithub}>
        Sign in using Github
      </Button>
    </div>
  );
}

export default SocialProvider;
