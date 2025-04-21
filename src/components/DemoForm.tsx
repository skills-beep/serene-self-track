
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type DemoFormVals = {
  mood: string;
  goal: string;
};

const STORAGE_KEY = "wellness-demo-mood";

export const DemoForm: React.FC = () => {
  const { register, handleSubmit, formState, reset, watch } = useForm<DemoFormVals>({
    defaultValues: { mood: "", goal: "" }
  });

  // Mock data persistence/auto-save
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        reset(JSON.parse(saved));
      } catch {}
    }
  }, [reset]);

  useEffect(() => {
    const subscription = watch(data => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: DemoFormVals) => {
    alert("Mood logged! (Persistence is local only for demo)");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass-morphism w-full max-w-md mx-auto px-6 py-6 rounded-2xl mt-6 mb-3 border border-white/20 shadow-lg flex flex-col gap-4 animate-fade-in"
      style={{ background: "linear-gradient(120deg,rgba(31,44,71,.24),rgba(50,70,109,0.17))" }}
      aria-label="Today's Mood"
    >
      <h2 className="text-lg font-semibold text-white/80 mb-2 flex items-center gap-2">
        <span className="inline-block text-xl" role="img" aria-label="mood">💬</span>
        Mood & Goal Log
      </h2>
      <div>
        <Input
          {...register("mood", { required: "Please share your mood!" })}
          placeholder="How are you feeling today?"
          className="bg-white/20 text-white/90 border border-white/10 backdrop-blur placeholder:text-white/50"
          aria-label="Your mood"
        />
        {formState.errors.mood && (
          <span className="text-xs text-rose-400">{formState.errors.mood.message}</span>
        )}
      </div>
      <div>
        <Input
          {...register("goal")}
          placeholder="Today's small goal?"
          className="bg-white/20 text-white/90 border border-white/10 backdrop-blur placeholder:text-white/50"
          aria-label="Today's Goal"
        />
      </div>
      <Button type="submit" className="mt-1 w-full">
        Log Mood
      </Button>
    </form>
  );
};
