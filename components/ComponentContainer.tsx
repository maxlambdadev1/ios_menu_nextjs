'use client';

export function  ComponentContainer ( props : any ) {
    return (
        <div className={`rounded-lg border-2 border-sky-400 overflow-hidden ${props.className}`}>
            <div className='text-center font-bold py-3'>
                { props.title }
            </div>
            <div className="flex justify-evenly items-center p-3" 
                style={{backgroundColor : props.bgColor ? props.bgColor : '' , minHeight : '250px', height : 'calc(100% - 48px)' }}
            >
                { props.children }
            </div>
        </div>
    )
}
