
<div align="center">
  <h1>
    🔍Evidence Monitoring tool 🎞️
  </h1>

<p>It is a real-time application, which means that any changes you make will be displayed instantly, without the need to reload the page. Currently, it accepts Twitch clips videos as evidence. In the future, it will support additional file types and videos from different sources.</p>


 [Live Web Url](https://realtime-evidence-tracker.vercel.app/dashboard/evidence)

</div>

## Table of Contents
- [Features & Usage](#features)
  - [Participants](#participants)
  - [Statistics](#statistics)
  - [Evidence Management](#evidence-management)
  - [Questions](#questions)
  - [Penalties](#penalties)
  - [Finances](#finances)
  - [Finance Status](#finance-status)
- [Responsive](#responsive)
- [My Process](#my-process)
  - [What I learnt](#what-i-learnt)
    - [Server Actions & forms](#server-actions--forms-experimental-feature)
    - [Supabase With SWR](#supabase-with-swr)
    - [Supabase Schema](#supabase-with-swr)
  - [Built With](#build-with)
- [Deployment](#deployment)
  - [Deployment Scripts](#deployment-scripts)
  - [Environment Variables](#environment-variables)
- [Author](#author)


## Features:

### Participants:

https://github.com/Ivanricee/real@@time-evidence-tracker/assets/13322969/6c4855f8-cf3d-4bc2-9f7c-cb2cadf30882


### Statistics:
  Displays statistics for each participant, including penalties and finances. Moreover, this content can be placed in OBS, so you can show or hide the statistics of other participants and align the content as you wish. [View Stats](https://realtime-evidence-tracker.vercel.app/participants/1?showInfo=true)

![obs_test](https://github.com/Ivanricee/realtime-evidence-tracker/assets/13322969/e7646c49-f35a-4262-bf5c-a9e844a11d95)


### Evidence Management:
  Allows you to manage Twitch clips, which are added to a "pending" section where they can be accepted or rejected. When evidence is accepted, a "penalty" is generated: [View Evidence Management](https://realtime-evidence-tracker.vercel.app/manage/evidence?participantId=1).

https://github.com/Ivanricee/realtime-evidence-tracker/assets/13322969/c1b7db99-df0a-45b1-9592-b5dc8e8304c0


### Questions
  You can create questions with multiple options and a defined time limit. When a question is created, it automatically appears on the participants' screen, along with a timer. Questions that are answered incorrectly or out of time are marked as penalties.

Create questions: [Quiz Dashboard.](https://realtime-evidence-tracker.vercel.app/dashboard/quiz) </br>
View and answer questions: [Quiz Management.](https://realtime-evidence-tracker.vercel.app/manage/quiz)

https://github.com/Ivanricee/realtime-evidence-tracker/assets/13322969/4fac636c-5ee0-4260-80b6-ab5cadae3a4e


### Penalties:
  In the URLs provided earlier for Evidence Management and Quiz Management, you can see the number of pending penalties, meaning the challenges or punishments that participants must fulfill. When a participant fulfills their penalty, you should press the "cumplir sanciones" button.

### Finances:

  You can keep track of bets with bits or subscriptions. This section manages debts and debtors. Only the participant who makes the bet can take this action. If a debt is not fulfilled, a new one should not be created until it's completed [View Finance Dashboard](https://realtime-evidence-tracker.vercel.app/dashboard/finance).

### Finance Status:

  In the finance administration section, you can see the debts and debtors of a participant. These debts can have three statuses: "pending," "in review," and "completed." Here's the link to review and manage finances: [View Finance Management](https://realtime-evidence-tracker.vercel.app/manage/finance).


https://github.com/Ivanricee/realtime-evidence-tracker/assets/13322969/f3a69d4e-0cca-4f27-a886-9e69be534d9e


## Responsive

![responsive](https://github.com/Ivanricee/realtime-evidence-tracker/assets/13322969/616079c5-4134-406f-b8e3-90a595212b45)

## My Process
### What I learnt
This was my first experience with Next.js 13 and Supabase in a project. One thing that gave me some trouble was working with action servers. On the other hand, I was pleasantly surprised that integrating SWR made my code easier to read and shorter.

Of course, learning Supabase, Next.js routing, and server components was challenging, but the learning curve wasn't that tough.


#### Server Actions & forms (experimental feature)
The most challenging part was creating a form with a Button submission state and configuring an action server to handle a mutation in the Supabase database.

First, I created a Button component using useFormStatus to track the form submission status and implement a loader. The 'pending' property becomes 'true' when the form is being submitted (during the submission action's progress). When the submission is complete, 'pending' switches to 'false'.

`file: /components/Submit.tsx`
```js
const { pending } = useFormStatus()
```

I'm also utilizing server actions for submitting the form::

```html
.
.
.
<form
  ref={formRef}
  action={submitAddQuiz}
  className="w-full flex flex-col"
>
...
```
So, the action server exclusively operates on the server, making it impossible to clear the form directly. To address this, I created a file to store all the server actions in 'app/actions/' directory. This approach also helps in separating my client code from the server.

Now, once the action submission is complete, I can clear my form.
```js
.
.
.
if (status === 201) {
  inputsRef.current?.reset()
  formRef.current?.reset()
}
...
```
#### Supabase With SWR
I used SWR to cache data from Supabase. Since I was frequently calling participant data, SWR provided a straightforward solution to the problem. I used the mutate function from SWR only when changes occurred in my Supabase subscription.

The result: `hooks/useParticipants.tsx`
```js
export function useParticipants(): response {
  const supabase = createClientComponentClient<Database>()
  const { data: participants, error } = useSWR<Participants[]>(
    'participants-key',
    fetcher
  )

  useEffect(() => {
    const channel = supabase
      .channel('participants')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'participants',
        },
        (payload) => {
          mutate('participants-key')
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])
  return [participants || [], !error && !participants, error]
}
```
## Supabase Schema
I created a database for this project and also implemented functions and triggers to simplify the code.

![supabase_schema](https://github.com/Ivanricee/realtime-evidence-tracker/assets/13322969/2b4718af-7fef-4f5f-bd84-bf421fc28fc8)

### Build With:

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

## Deployment

### Deployment Scripts

In the project directory, you can run:

#### `npm run build`

This command builds the Next.js application for production. It creates an optimized version of your application in the `.next` folder.

#### `npm run start`

This command starts a Next.js production server with the built application. It serves the built version of your application from the `.next` folder.

Remember to replace `npm` with `yarn` if you're using Yarn as your package manager.

### Environment Variables

To run this project, you will need to add the following supabase environment variables to your .env file


`NEXT_PUBLIC_SUPABASE_URL`

`NEXT_PUBLIC_SUPABASE_ANON_KEY`


## Author

- Twitter - [@ivanrice_](https://twitter.com/ivanrice_)
- Art Instagram - [ivanrice_](https://www.instagram.com/ivanrice_)
