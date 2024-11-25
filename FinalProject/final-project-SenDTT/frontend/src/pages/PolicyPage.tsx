import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react";
import { Policy } from "../types/policyTypes";
import Badge from "../components/Badge";
import { deleteVote, getPolicy, votePolicyOrReply } from "../api";
import { Context, IUser } from "../Global";

const PolicyPage = () => {
    const { id } = useParams();
    const [policy, setPolicy] = useState<Policy | undefined>();
    const [voted, setVoted] = useState<boolean>(false);
    const { user, isAuthenticated } = useContext(Context);

    const handleVote = async () => {
        setVoted(!voted);
        let data: { data: object | object[] | null, success: boolean };

        if (voted) {
            data = await deleteVote({ type: 'policy', associate_id: (policy as Policy).id!, user_id: (user as IUser).id! });
            if (data.success && policy) {
                setPolicy(() => ({ ...policy, votes: policy?.votes - 1 }));
            }
        } else {
            data = await votePolicyOrReply({ type: 'policy', associate_id: (policy as Policy).id!, user_id: (user as IUser).id! });
            if (data.success && policy) {
                setPolicy(() => ({ ...policy, votes: policy?.votes + 1 }));
            }
        }
    };

    useEffect(() => {
        async function getPolicyHandle(policyId: number) {
            const response = await getPolicy(policyId);
            setPolicy(response.data);
            setVoted(response.data.isVoted);
        }

        if (id) getPolicyHandle(Number(id));
    }, [id]);

    return (
        <Layout>
            {policy ? (
                <>
                    <div className="flex flex-row justify-between gap-4 items-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            <Link
                                to={`/p/${policy.id}`}
                                className="hover:text-purple-500 hover:underline transition duration-200 text-purple-700"
                            >
                                {policy.title}
                            </Link>
                        </h3>
                        <div className="flex flex-col justify-center items-center gap-1 w-20">
                            <div className="py-3 border border-slate-300 rounded w-full text-center">
                                {policy.votes}
                            </div>
                            <button
                                disabled={!isAuthenticated()}
                                onClick={handleVote}
                                className="flex flex-col text-center justify-center items-center py-2 bg-blue-500 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-600 outline-none min-w-20 w-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                <p>{voted ? 'Voted' : 'Vote'}</p>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm text-gray-500 mb-2">
                        <p className="font-medium">Owner: <span className="text-green-600">{policy.owner.username}</span></p>
                        <p className="font-medium">Category: <Badge id={policy.category.id} color={policy.category.color ?? 'gray'}>{policy.category.name}</Badge></p>
                    </div>
                    <p
                        className="text-gray-600 text-sm"
                        dangerouslySetInnerHTML={{
                            __html: policy.body,
                        }}
                    ></p>
                </>
            ) : (
                <p>Policy not found.</p>
            )}
        </Layout>
    )
}

export default PolicyPage;