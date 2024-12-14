const InfoContainer = ({
  bgColor = "[#ffc2ea]",
  display = null,
  gridCols = 1, // Default to 1 column if not provided
  title,
  height,
  mobileHeight,
  description,
  flexDirection,
  children,
}: {
  bgColor?: string;
  display?: string | null;
  gridCols?: number; // Optional property
  title?: string;
  height?: string | number;
  mobileHeight?: string | number;
  description?: string;
  flexDirection?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
  className={`${
    display === "grid" ? `grid grid-cols-${gridCols}` : display
  } flex-col lg:flex-${flexDirection} items-center p-4 ${
    bgColor === "pink"
      ? "bg-pink-200"
      : bgColor === "blue"
      ? "bg-blue-200"
      : "bg-[#ffc2ea]"
  } w-full text-center ${height ? `lg:h-[${height}px]` : "lg::h-auto"} ${
    mobileHeight ? `h-[${mobileHeight}px]` : "h-auto"
  }`}
>
  {title && <h3 className="font-bold text-[20px] lg:text-[28px]">{title}</h3>}
  {description && <p className="text-[14px] lg:text-[16px]">{description}</p>}
  {children}
</div>

  );
};

export default InfoContainer;
