import { useEffect, useState } from "react";

export default function useAppWrite<T>(fn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    setIsLoading(true);

    const data = await fn();

    setData(data);

    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, refetch: fetchData };
}
