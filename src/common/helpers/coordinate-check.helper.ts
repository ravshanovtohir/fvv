import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsGeoJsonCoordinates(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isGeoJsonCoordinates',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!Array.isArray(value)) return false;

          const type = (args.object as any).type;

          switch (type) {
            case 'Point':
              return value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number';
            case 'LineString':
              return value.every(
                (coord: any) =>
                  Array.isArray(coord) && coord.length === 2 && coord.every((n: any) => typeof n === 'number'),
              );
            case 'Polygon':
              return value.every(
                (ring: any) =>
                  Array.isArray(ring) &&
                  ring.every(
                    (coord: any) =>
                      Array.isArray(coord) && coord.length === 2 && coord.every((n: any) => typeof n === 'number'),
                  ),
              );
            default:
              return false;
          }
        },
      },
    });
  };
}
