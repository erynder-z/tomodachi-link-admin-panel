import { formatDistanceToNow } from 'date-fns';

type TokenInfoProps = {
  tokenExpiration: number | null;
};

export default function TokenInfo({ tokenExpiration }: TokenInfoProps) {
  const tokenExpirationDate = tokenExpiration
    ? formatDistanceToNow(tokenExpiration, { addSuffix: true })
    : '';
  return (
    <div className="fixed bottom-0 text-xs font-mono font-bold bg-amber-500 text-neutral-50 px-1">
      Token expiration: {tokenExpirationDate}
    </div>
  );
}
