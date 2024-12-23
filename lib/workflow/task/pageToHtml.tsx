import { TaskParamType, TaskType } from "@/types/task";
import { CodeIcon, LucideProps } from "lucide-react";

export const PageToHtmlTask = {
    type: TaskType.PAGE_TO_HTML,
    label: 'Get HTML from Page',
    icon: (props: LucideProps) => (<CodeIcon className="stroke-rose-400" {...props} />),
    isEntryPoint: false,
    inputs: [{
        name: 'webpage',
        type: TaskParamType.BROWSER_INSTANCE,
        required: true,
    }]
}