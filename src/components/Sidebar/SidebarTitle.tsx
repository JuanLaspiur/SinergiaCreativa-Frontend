
function SidebarTitle() {
  return (
    <div className="d-flex align-items-center">
    <img
      src="/cometa.png"
      alt="Icono"
      style={{
        width: '50px',
        height: '50px',
        objectFit: 'contain',
      }}
      className="m-1 d-none d-md-block"
    />
    <img
      src="/cometa.png"
      alt="Icono"
      style={{
        width: '30px',
        height: '30px',
        objectFit: 'contain',
      }}
      className="m-1 d-block d-md-none"
    />
    <h2 className="text-center mb-0 ms-2">Sinergía</h2>
  </div>
  )
}

export default SidebarTitle