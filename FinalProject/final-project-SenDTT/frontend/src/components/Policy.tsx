import { Link } from "react-router-dom";
import Badge from "./Badge";
import { Policy } from "../types/policyTypes";

const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

const PolicyItem = ({ policy }: { policy: Policy }) => {
    return (
        <li
            className="border-b border-gray-300 pb-4"
        >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                <Link
                    to={`/p/${policy.id}`}
                    className="hover:text-purple-500 hover:underline transition duration-200 text-purple-700"
                >
                    {policy.title}
                </Link>
            </h3>
            <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm text-gray-500 mb-2">
                <p className="font-light text-slate-500">Owner: <span className="font-medium text-green-600">{policy.owner.username}</span></p>
                <p className="font-light text-slate-500">Category: <Badge id={policy.category.id} color={policy.category.color ?? 'gray'}>{policy.category.name}</Badge></p>
                <p className="font-light text-slate-500">
                    Votes: <span className="font-medium text-blue-600">{policy.votes}</span>
                </p>
            </div>
            <p
                className="text-gray-600"
                dangerouslySetInnerHTML={{
                    __html: truncateText(stripHtml(policy.body), 100),
                }}
            ></p>
        </li>
    )
}

export default PolicyItem;