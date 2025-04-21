
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HowItWorksModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="Show How It Works"
        className="mr-2"
      >
        <Info className="h-5 w-5 text-primary/80" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md glass-morphism border border-primary/20">
          <DialogHeader>
            <DialogTitle>How It Works</DialogTitle>
            <DialogDescription>
              Welcome to SereneSelf Fitness! Here’s how to get the most out of your dashboard:
            </DialogDescription>
          </DialogHeader>
          <ul className="text-sm text-white/80 mt-3 space-y-2 pl-2">
            <li>🌙 Track your sleep, water, exercise, and moods daily.</li>
            <li>🌠 View your progress, goal streaks, and motivational quotes each day.</li>
            <li>✨ Toggle night sky intensity or disable animations if needed.</li>
            <li>☁️ Check the weather widget for inspiration.</li>
            <li>🗓 Use the calendar to reflect on trends.</li>
            <li>🎨 Switch between Light/Dark modes anytime.</li>
            <li>💾 All form entries are auto-saved (locally) for your privacy.</li>
          </ul>
          <DialogClose asChild>
            <Button variant="secondary" className="mt-4 w-full">Got it!</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};
