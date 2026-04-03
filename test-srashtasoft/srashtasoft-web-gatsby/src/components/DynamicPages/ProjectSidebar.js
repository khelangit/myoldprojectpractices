import React from 'react'

const ProjectSidebar = ({ website, technologies, location, client, completed, }) => {
    return (
        <div className="case-studies-sidebar-sticky">
            <div className="case-studies-details-info">
                <ul>
                    <li>
                        <div className="icon">
                            <i className='bx bx-user-pin'></i>
                        </div>
                        <span>Client:</span>
                        <a className='word-a' href={website} target="_blank" rel="noreferrer">{client}</a>
                    </li>
                    {/* {location && (
                        <li>
                            <div className="icon">
                                <i className='bx bx-map'></i>
                            </div>
                            <span>Location:</span>
                            {location}
                        </li>
                    )} */}

                    {technologies && (
                        <li>
                            <div className="icon">
                                <i className='bx bx-purchase-tag'></i>
                            </div>
                            <span>Technologies:</span>
                            {technologies}
                        </li>
                    )}

                    {completed && (
                        <li>
                            <div className="icon">
                                <i className='bx bx-check'></i>
                            </div>
                            <span>Completed:</span>
                            {completed}
                        </li>
                    )}

                    {website && (
                        <li>
                            <div className="icon">
                                <i className='bx bx-globe'></i>
                            </div>

                            {(() => {

                                if (technologies == 'Android') {
                                    return (
                                        <span className='margin-sapn'>Application</span>
                                    )
                                }
                                if (technologies == 'Flutter') {
                                    return (
                                        <span className='margin-sapn'>Application</span>
                                    )
                                }
                                if (technologies == 'IOS') {
                                    return (
                                        <span className='margin-sapn'>Application</span>
                                    )
                                }
                                return (
                                    <span className='margin-sapn'>Website</span>
                                )
                            })()}



                            <a className='word-a' href={website} target="_blank" rel="noreferrer">{website}</a>
                        </li>
                    )}

                </ul>
            </div>
        </div>
    )
}

export default ProjectSidebar