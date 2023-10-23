import { NextApiRequest, NextApiResponse } from 'next';
import { withApollo } from 'hoc/withApollo.jsx';

const GET_ACTOR_SSR = `
query actor($url: String) {
  actor(url: $url) {
    id
    name
  }
}
`;


const Acteur = ({ initialData }) => {
};

export default withApollo()(Acteur);

export async function getServerSideProps(ctxt) {
console.log(ctxt.params)
    const res = await fetch(process.env.NEXT_PUBLIC_API_URI, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify({
        operationName: 'actor',
        variables: {
            url: ctxt.params.actorUrl,
        },
            
        query: GET_ACTOR_SSR,
        }),
    });

    const initialData = await res.json();
    if (initialData.errors) {
        console.error(
        ` Error fetching actor id ${
            ctxt.params.id
        } error message : ${
            initialData.errors[0].message
        }`,
        );


    }
    console.log(initialData);
    ctxt.res.writeHeader(307, { Location: "/actor/"+initialData.data.actor.id })
    ctxt.res.end()
    return {
        props: { initialData },
    };
    }