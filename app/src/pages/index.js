import commonRoutes from './common-routes';
import studentRoutes from './student-routes';
import instructorRoutes from './instructor-routes';

export default {
  student: [...commonRoutes, ...studentRoutes],
  instructor: [...commonRoutes, ...instructorRoutes],
};
