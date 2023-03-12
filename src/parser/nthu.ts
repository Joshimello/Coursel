export default courseData => {

  const request = new XMLHttpRequest()
  request.open('GET', courseData, false)
  request.send(null)

  return JSON.parse(request.responseText).map(course => ({

    'nameEN': course.課程英文名稱,
    'nameZH': course.課程中文名稱,

    'language': course.授課語言,

    'ID': course.科號,
    'semester': course.科號.slice(0, 5),
    'courseID': course.科號.slice(9, 15),
    'department': course.科號.slice(5, 9).trim(),

    'credits': course.學分數,
    'capacity': course.人限,
    'freshmanCapacity': course.新生保留人數,

    'teachersMerged': course.授課教師,

    'teachers': course.授課教師.split('\n').filter(i => i).map(t => ({
        'en': t.split('\t')[1],
        'zh': t.split('\t')[0],
     })),

    'venue': course.教室與上課時間.split('\t')[0],
    'time': course.教室與上課時間 ? course.教室與上課時間.match(/[M||T||W||R||F||S][1-9||a-c||n]/g) : [],

    'description': course.備註,

    'target': course.必選修說明.split('\t').filter(i => i),

    'prerequisites': course.擋修說明,
    'limits': course.課程限制說明,
    
    'closureInfo': course.停開註記,

    'addOrDropInfo': course.不可加簽說明,

    'geCategory': course.通識對象,
    'geType': course.通識類別,

    'secondaryCourseMapping': course.第一二專長對應.split('\t').filter(i => i),
    'creditCourseMapping': course.學分學程對應,
  }))

}