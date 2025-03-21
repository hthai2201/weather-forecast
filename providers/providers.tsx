import { PropsWithChildren } from 'react';
import QueryProvider from './queryProvider';

const providers = [QueryProvider];
function CombineProviders({ children }: PropsWithChildren) {
  return providers.reduce((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, children);
}
export default CombineProviders;
