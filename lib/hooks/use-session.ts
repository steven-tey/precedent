import { useState, useEffect } from 'react';

const useSession = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch('/api/auth/session');
      const data = await res.json();

      if (!data || !data.user) {
        setSession(null);
      } else {
        setSession(data);
      }
    };

    fetchSession();
  }, []);

  return { session, loading };
};

export default useSession;
