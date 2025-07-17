import HeroBackdrop from '../components/HeroBackdrop'


const Dashboard = () => {
    
    return (
    
    <div className='flex-1'>
    <HeroBackdrop minHeight='100vh'>
    <div className="p-6">
      <h2 className="text-3xl font-serif mb-4 text-white">
        Welcome to the Inventory Dashboard
      </h2>
      <p className='max-w-md text-white'>Manage your categories, products, staff and more, all in one place<br />Select an item from the sidebar to begin.</p>
    </div>
    </HeroBackdrop>
    </div>
    )
}

export default Dashboard