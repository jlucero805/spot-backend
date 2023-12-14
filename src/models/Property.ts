import { Schema, model, connect, Types} from "mongoose";

interface Property {
    stars: number;
    cost: number;
    distance: number;
    propertyImage: string;
    mapImage: string;
}

const propertySchema = new Schema<Property>({
    stars: { type: Number, required: true},
    cost: { type: Number, required: true},
    distance: { type: Number, required: true},
    propertyImage: { type: String, required: true},
    mapImage: { type: String, required: true},
});

const PropertyModel = model<Property>("Property", propertySchema);

export async function createProperty(props: Property) {
    await connect(process.env.MONGO as string);

    const property = new PropertyModel({
        stars: props.stars,
        cost: props.cost,
        distance: props.distance,
        propertyImage: props.propertyImage,
        mapImage: props.mapImage,
    });

    await property.save();
}

export async function getProperty(id: string) {
    await connect(process.env.MONGO as string);
    const item = await PropertyModel.findById(id);
    return item;
}

export async function getAllProperties() {
    await connect(process.env.MONGO as string);
    const items = await PropertyModel.find({});
    return items;
}
