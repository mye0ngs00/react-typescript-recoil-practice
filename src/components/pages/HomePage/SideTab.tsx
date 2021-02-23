import React, { ReactElement, useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { Tags } from '../../../agent'
import { ArticlesState, MOVE_TO_PAGE_CONFIG } from '../../../atoms'

const SideTab = (): ReactElement => {
  const setConfig = useSetRecoilState(ArticlesState.config)
  const [tags, setTags] = useState([])
  const handleTag = (tag: string) => {
    setConfig({
      ...MOVE_TO_PAGE_CONFIG,
      category: 'TAG',
      tag,
    })
  }
  useEffect(() => {
    Tags.getAll().then((res) => setTags(res.data.tags))
  }, [])

  return (
    <div className="side">
      <div className="tag-area">
        <h2 className="title">인기 태그</h2>
        <ul className="tag-list">
          {tags &&
            tags.map((tag: string, id: number) => (
              <li key={id} onClick={() => handleTag(tag)}>
                <a>{tag}</a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default SideTab
