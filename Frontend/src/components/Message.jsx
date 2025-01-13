
const Message = ({variant,children}) => {
    const getVariant = ()=>{
        switch (variant) {
            case "success":
                return "bg-green text-white  text-green-800"
                
            case "error":
                return "bg-red text-white  text-red-800"
            default :
            return 'bg-blue-100 text-blue-800'
        
        }

    }
  return (
    <div className={`p-4 rounded ${getVariant()}`}>{children}</div>
  )
}

export default Message