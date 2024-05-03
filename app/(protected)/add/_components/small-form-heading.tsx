interface SmallFormHeadingProps {
    label: string;
}

export const SmallFormHeading = ({ label }: SmallFormHeadingProps) => {
    return (
        <h2 className="font-semibold text-gray-800 text-sm">{label}</h2>
    )
}