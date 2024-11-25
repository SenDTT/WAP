import { Color } from "../types/commonTypes";

const colorClasses: Record<Color, { bg: string; text: string; ring: string }> = {
    red: {
        bg: "bg-red-50",
        text: "text-red-700",
        ring: "ring-red-600/20",
    },
    yellow: {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        ring: "ring-yellow-600/20",
    },
    green: {
        bg: "bg-green-50",
        text: "text-green-700",
        ring: "ring-green-600/20",
    },
    blue: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        ring: "ring-blue-600/20",
    },
    indigo: {
        bg: "bg-indigo-50",
        text: "text-indigo-700",
        ring: "ring-indigo-600/20",
    },
    purple: {
        bg: "bg-purple-50",
        text: "text-purple-700",
        ring: "ring-purple-600/20",
    },
    pink: {
        bg: "bg-pink-50",
        text: "text-pink-700",
        ring: "ring-pink-600/20",
    },
    gray: {
        bg: "bg-gray-50",
        text: "text-gray-700",
        ring: "ring-gray-600/20",
    }
};

const Badge: React.FC<{ children: React.ReactNode, id: number, color: Color }> = ({ children, color }) => {
    const classes = colorClasses[color];

    return (
        <span
            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${classes.bg || ""
                } ${classes.text || ""} ${classes.ring || ""}`}
        >
            {children}
        </span>
    )
}


export default Badge;