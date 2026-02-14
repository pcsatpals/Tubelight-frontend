import SectionButton from "./section-button"
import { cn } from "@/lib/utils";

const SectionHeading = ({
    section,
    showButton = true,
    title,
    description,
    classNames = {}
}: {
    section: {
        icon?: React.ComponentType;
        sectionName?: string;
        id: string
    };
    showButton?: boolean;
    title: string;
    description: string;
    classNames?: {
        container?: string;
        button?: string;
        title?: string
        description?: string
    }
}) => (
    <div className={cn('flex flex-col gap-2 items-center text-center md:max-w-[60%] max-w-screen w-full mt-20 pb-6', classNames.container)}
        data-aos="fade" id={section.id}>
        {showButton && <SectionButton href={`#${section.id}`} className={cn('md:text-base text-sm glass-card ', classNames.button)}>
            {section.icon && <section.icon />}
            {section.sectionName || ""}
        </SectionButton>}
        <p className={cn("lg:text-5xl sm:text-4xl text-3xl font-base mt-2 font-figtree font-semibold", classNames.title)} dangerouslySetInnerHTML={{ __html: title }} />
        <p className={cn("text-muted-foreground md:text-base lg:text-sm text-xs sm:max-w-full max-w-[80%]", classNames.description)} dangerouslySetInnerHTML={{ __html: description }} />
    </div>
)

export default SectionHeading