import React, { ReactElement, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { ArticlesState, MOVE_TO_PAGE_CONFIG } from '../../../atoms'
import { main_categories, profile_categories } from './categories'

const Navigator = (): ReactElement => {
  const [{ category, username }, setConfig] = useRecoilState(ArticlesState.config)
  const [categories, setCategories] = useState([
    {
      title: '',
      category: '',
    },
  ])
  const onClickCategory = (newCategory: string) => {
    setConfig({
      ...MOVE_TO_PAGE_CONFIG,
      category: newCategory,
      username,
    })
  }
  useEffect(() => {
    switch (category) {
      case 'GLOBAL_ARTICLES':
      case 'TAG':
      case 'MY_FEED':
        setCategories(main_categories)
        break
      case 'PROFILE_ARTICLES':
      case 'FAVORITE_ARTICLES':
        setCategories(profile_categories)
        break
      default:
        break
    }
  }, [category])

  return (
    <ul className="nav-tab">
      {categories.map((c) => (
        <li
          key={c.title}
          className={c.category === category ? 'selected' : ''}
          onClick={() => onClickCategory(c.category)}
        >
          <a>{c.title}</a>
        </li>
      ))}
    </ul>
  )
}

export default Navigator
