import getServices from "@/services/services/getServices";

export default async function ServiceTable() {
  const services = await getServices();
  if (!services) {
    throw new Error("Fail to fetch data");
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Service Title</th>
          <th> Price </th>
          <th> Service Period </th>
          <th> Delivery Room </th>
          <th> Status </th>
        </tr>
      </thead>
      <tbody>
        {services.map((service: any) => (
          <tr key={service._id}>
            <td>{service?.serviceTitle}</td>
            <td>{service?.price}</td>
            <td>{service?.servicePeriod}</td>
            <td>{service?.deliveryRoom}</td>
            <td>{service?.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
