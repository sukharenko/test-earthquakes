import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';

const client = new ApolloClient({
	uri: process.env.NEXT_PUBLIC_BACKEND_URL,
	cache: new InMemoryCache(),
});

interface ApolloWrapperProps {
	children: ReactNode;
}

const ApolloWrapper = ({ children }: ApolloWrapperProps) => {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
