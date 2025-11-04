export class SVGProps {
	width: string;
	height?: string;
	color?: string;
	fill?: string;
	stroke?: string;
} 

// export const defProps = defineProps<{
// 	width: number
// 	height?: number
// 	color?: string
// 	fill?: string
// 	stroke?: string
// }>();

// export class Props implements IProps {
// 	width: string;
// 	height?: string;
// 	color?: string;
// 	fill?: string;
// 	stroke?: string;


// 	constructor(props: IProps) {
// 		this.width = props.width;
// 		this.height = props.height ?? this.width;

// 		const DEFAULT_COLOR = "Black"
// 		let f = DEFAULT_COLOR, s = f;
// 		if (props.color) {
// 			s = f = props.color;
// 		}

// 		this.fill = props.fill ?? f;
// 		this.stroke = props.stroke ?? s;
// 	}

// 	public static defineProps() {
// 		return defineProps<IProps>()
// 	}
// }