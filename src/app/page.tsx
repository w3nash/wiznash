import ChatInterfaceWrapper from "@/components/chat-interface-wrapper";
import { ThemeToggle } from "@/components/theme-toggle";
import WizardHat from "@/components/wizard-hat";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-4 md:p-8 bg-gradient-to-br from-background to-accent/10 overflow-y-hidden'>
      <div className='w-full max-w-4xl flex flex-col items-center'>
        <div className='w-full text-center mb-6 mt-2 relative'>
          <WizardHat />
          <h1 className='text-4xl font-bold text-primary'>WizNash</h1>
          <p className='text-muted-foreground mb-6'>
            Your magical companion chatbot
          </p>

          <div className='absolute top-0 right-0 flex items-center'>
            <ThemeToggle />
          </div>
        </div>

        <ChatInterfaceWrapper />

        <footer className='w-full py-3 text-center text-sm text-muted-foreground mt-6'>
          <p>
            © Copyright {new Date().getFullYear()} WizNash by{" "}
            <a
              href='https://w3nash.dev'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              W3Nash
            </a>{" "}
            • All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
