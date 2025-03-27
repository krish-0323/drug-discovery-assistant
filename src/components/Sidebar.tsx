"use client"
import React from 'react'
import {FileQuestionIcon, HistoryIcon, MenuIcon, MessageSquare, SettingsIcon} from 'lucide-react'
import { ResearchType } from '@/lib/db/schema'

interface Props {
  note: ResearchType
}

const Sidebar = ({note}: Props) => {
  const [extended, setExtended] = React.useState(true);
  return (
    <>
      <div className="sidebar bg-slate-200 rounded-lg">
        <div className="top">
          <div className="menu-icon">
            <MenuIcon onClick={() => setExtended(!extended)} />
          </div>
          {extended && (
            <div className="recent">
              <p className="recent-title">Recent</p>
              <div className="recent-entry">
              <MessageSquare />
              <p>What is Lorem...</p>
            </div>
          </div>
          )}
        </div>
        <div className="bottom">
          <div className="bottom-item recent-entry">
            <FileQuestionIcon/>
            {extended && <p>Help</p>}
          </div>
          <div className="bottom-item recent-entry">
            <HistoryIcon/>
            {extended && <p>History</p>}
          </div>
          <div className="bottom-item recent-entry">
            <SettingsIcon/>
            {extended && <p>Settings</p>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
