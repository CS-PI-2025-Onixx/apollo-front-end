
import { useQuery } from '@tanstack/react-query'
import carros from '../data/car.json';
// const fetch = async (id) => {
//     const id_car = parseInt(id)
//     const response = await Api.post('/buscar_carro', { car_id: id_car })
//     return response.data
// }
const fetch = async (id) => {
    const id_car = parseInt(id);
    console.log('id_car', id_car);
    const car = carros.data.find(car => car.id_car == id_car);
    if (!car) {
        throw new Error('Carro não encontrado');
    }
    console.log('car', car);
    return car;
};

export function useCarDetail(id) {
    const query = useQuery({
        queryFn: () => fetch(id),
        queryKey: ['car', id],
        enabled: !!id,
        staleTime: 0,
        refetchOnWindowFocus: false,
    })

    return {
        ...query,
        car: query.data,
    }
}