

"use client";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "@/convex/_generated/api";
import { Link } from "@/components/typography/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { StickyHeader } from "@/components/layout/sticky-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { MusicOptionCards } from './MusicOptionCards';


export default function Home() {


  return (
    <>
      <StickyHeader className="px-4 py-2">
        <div className="flex justify-between items-center">
          HackMIT Project
          <SignInAndSignUpButtons />
        </div>
      </StickyHeader>

      <main className="container max-w-2xl flex flex-col gap-8">
        <Authenticated>
            <SignedInContent /> 
        </Authenticated>
        <Unauthenticated>
          <h1 className="text-4xl font-extrabold my-8 text-center">
            Welcome
          </h1>
          <p>Click one of the buttons in the top right corner to sign in.</p>
        </Unauthenticated>
      </main>
    </>
  );
}

function SignInAndSignUpButtons() {

  return (
    <div className="flex gap-4">
      <Authenticated>
        <UserButton afterSignOutUrl="#" />
      </Authenticated>

      <Unauthenticated>
        <SignInButton mode="modal">
          <Button variant="ghost">Sign in</Button>
        </SignInButton>

        <SignUpButton mode="modal">
          <Button>Sign up</Button>
        </SignUpButton>
      </Unauthenticated>
    </div>
  );
}






function SignedInContent() {
  const { viewer, numbers } =
    useQuery(api.myFunctions.listNumbers, {
      count: 10,
    }) ?? {};

  interface FormValues {
    favoriteGenres: string[];
    sadMusic: string[];
    happyMusic: string[];
    workoutMusic: string[];
    angryMusic: string[];
    otherPreferences: string[];
  }

  const form = useForm<FormValues>({
    defaultValues: {
      favoriteGenres: [],
      sadMusic: [],
      happyMusic: [],
      workoutMusic: [],
      angryMusic: [],
      otherPreferences: [],
    },
  });


  const submitMusicPreferences = useMutation(api.musicprefs.submitMusicPreferences);
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await submitMusicPreferences(data);
      router.push('/Dashboard');
      // You can add some user feedback here, like a success message
    } catch (error) {
      console.error("Error submitting preferences:", error);
      // You can add some error handling here, like showing an error message to the user
    }
  };



  if (viewer === undefined) {
    return (
      <>
        <Skeleton className="h-5 w-full" />
      </>
    );
  }


  return (
    <>
    <h1 className="text-4xl font-extrabold my-8 text-center">
      Welcome {viewer ?? "N/A"}!
    </h1>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

   <FormField
      control={form.control}
      name="favoriteGenres"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Favorite Music Genres</FormLabel>
          <FormControl>
            <>
              <MusicOptionCards
                options={['Rock', 'Rap', 'Ballad', 'Guitar', 'Piano', 'Bollywood', 'KPop']}
                onSelect={(value) => field.onChange(value)} 
              />
              <Input 
                placeholder="Other genres (e.g., Jazz, Classical, Electronic)" 
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
              />
            </>
          </FormControl>
          <FormDescription>
            Select a common genre or type your own. Enter in a common-separated list
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="sadMusic"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Music for Sad Moments</FormLabel>
          <FormControl>
            <>
              <MusicOptionCards
                options={['Sad Ballads', 'Slow Blues', 'Nostalgia', 'Heartbreak', 'Motivational']}
                onSelect={(value) => field.onChange(value)}
              />
              <Input 
                placeholder="What else do you listen to when sad?" 
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
              />
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="happyMusic"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Music for Happy Moments</FormLabel>
          <FormControl>
            <>
              <MusicOptionCards
                options={['Happy','Pop', 'Dance', 'Fast', 'DJ Party', 'Acapella']}
                onSelect={(value) => field.onChange(value)}
              />
              <Input 
                placeholder="What else do you listen to when happy?" 
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
              />
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="workoutMusic"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Workout Music</FormLabel>
          <FormControl>
            <>
              <MusicOptionCards
                options={['Hip-Hop', 'Electronic', 'Minimal Lyrics', 'Rythmic', 'Video Game Music']}
                onSelect={(value) => field.onChange(value)}
              />
              <Input 
                placeholder="What else do you listen to when working out?" 
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
              />
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="angryMusic"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Music for Angry Moments</FormLabel>
          <FormControl>
            <>
              <MusicOptionCards
                options={['Metal', 'Punk', 'Calming', 'Angry', 'Rebellious', 'Breaking Free']}
                onSelect={(value) => field.onChange(value)}
              />
              <Input 
                placeholder="What else do you listen to when angry?" 
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
              />
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />


    <FormField
      control={form.control}
      name="otherPreferences"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Other Music Preferences</FormLabel>
          <FormControl>
            <Input placeholder="Any other music preferences?" {...field} />
          </FormControl>
          <FormDescription>
            E.g., favorite artists, preferred decades, language preferrances etc.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>


  </form>
</Form>
      

     
    </>
  );

  
}
