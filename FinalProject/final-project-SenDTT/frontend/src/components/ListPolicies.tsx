import { Policy } from "../types/policyTypes";
import PolicyItem from "./Policy";

const ListPolicies = ({ rows }: { rows: Policy[], count: number }) => {
    return (
        <>
            {rows && Array.isArray(rows) && rows.length === 0 ? (
                <p>No policies available.</p>
            ) : (
                <ul className="list-none p-0 space-y-6">
                    {rows.map((policy) => (
                        <PolicyItem
                            key={policy.id} policy={policy} />
                    ))}
                </ul>
            )}
        </>
    )
}

export default ListPolicies;