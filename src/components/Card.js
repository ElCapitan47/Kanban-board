import React from 'react';
import user from '../assets/User.png';
import dot from '../assets/Dot.png';
import { ReactComponent as NoPriorityIcon } from '../assets/icons_FEtask/No-priority.svg';
import { ReactComponent as LowPriorityIcon } from '../assets/icons_FEtask/Img - Low Priority.svg';
import { ReactComponent as HighPriorityIcon } from '../assets/icons_FEtask/Img - High Priority.svg';
import { ReactComponent as MediumPriorityIcon } from '../assets/icons_FEtask/Img - Medium Priority.svg';
import { ReactComponent as UrgentPriorityIcon } from '../assets/icons_FEtask/SVG - Urgent Priority colour.svg';
import { ReactComponent as BacklogIcon } from '../assets/icons_FEtask/Backlog.svg';
import { ReactComponent as TodoIcon } from '../assets/icons_FEtask/To-do.svg';
import { ReactComponent as InProgressIcon } from '../assets/icons_FEtask/in-progress.svg';
import { ReactComponent as DoneIcon } from '../assets/icons_FEtask/Done.svg';
import { ReactComponent as CancelledIcon } from '../assets/icons_FEtask/Cancelled.svg';


const Card = ({ id,title,tags, priority, status}) => {
      
      const statusIcons = {
        'Backlog': <BacklogIcon/>,
        'Todo': <TodoIcon/>,
        'In progress': <InProgressIcon/>,
        'Done': <DoneIcon/>,
        'Cancelled': <CancelledIcon/>,
      };

      const priorityIcons = {
        0: <NoPriorityIcon/>,
        1: <LowPriorityIcon/>,
        2: <MediumPriorityIcon/>,
        3: <HighPriorityIcon/>,
        4: <UrgentPriorityIcon/>,
      };
    
  return (
    <div style={cardStyle}>
      
        <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
          <div style={descriptionStyle}>
            {id}
            <img src={user} alt="Logo" height={25} width={25} />
          </div>
          <div style={titleStyle}>
            {statusIcons[status]}
            <span style={{width: '90%'}}>{title}</span>
          </div>
        </div>

     
      
      <div style={{display : 'flex', alignItems: 'center', gap: '8px'}}>
        <div style={{display: 'flex', alignItems:'center', border: '1px solid #d3d3d3', padding: '4px', borderRadius: '5px',}}>
          {priorityIcons[priority]}
        </div>
        <div style={tagsContainerStyle}>
          {tags.map((tag, index) => (
            <span key={index} style={tagStyle}>
              <img src={dot} alt="Logo" height={10} width={10} style={{opacity: 0.5}}/>
              {tag}
            </span> 
          ))}
        </div>
      </div>
      
    </div>
  )
}

const cardStyle = {
  backgroundColor: 'white',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '5px',
  padding: '15px',
  marginBottom: '15px',
  width: '100%', 
  boxSizing: 'border-box', 
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const titleStyle = {
  fontSize: '14px',
  fontWeight: 'bold',
  display: 'flex',
  // alignItems: 'center',
  justifyContent: 'space-between',
  gap: '5px',
};

const avatarStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  marginRight: '10px',
};

const descriptionStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '10px',
  fontSize: '12px',
  fontWeight: 'semi-bold',
  color: '#636363',
};

const tagsContainerStyle = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
};

const tagStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
  backgroundColor: 'white',
  border: '1px solid #d3d3d3',
  borderRadius: '5px',
  padding: '4px',
  paddingLeft: '2px',
  fontSize: '12px',
  color: '#636363',
};

export default Card





