export default async function CarDetailsPage({
  params,
}: PageProps<'/catalog/[carId]'>) {
  const { carId } = await params;

  return (
    <div className='container'>
      <h1>Car {carId}</h1>
    </div>
  );
}
