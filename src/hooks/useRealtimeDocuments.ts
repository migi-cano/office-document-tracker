import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useRealtimeDocuments(
  onChange: () => void
) {
  useEffect(() => {
    const channel = supabase
      .channel(`documents-${Date.now()}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "documents",
        },
        () => {
          onChange();
        }
      );
      

    channel.subscribe((status) => {
      console.log("Realtime status:", status);
    });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [onChange]);
}