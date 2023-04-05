
import * as yup from 'yup';

export async function Validate(schema, data) {
    let error = ''
    await schema.validate(data).catch(function (err) {
        error = {
            path: err.path,
            message: (err.errors || []).map((e => e[0].toUpperCase() + e.slice(1))).join(', ')
        }
    });
    return error
}


export   const calculateStarCount = (reviews = []) => {
    const totalReviewsCount = reviews.reduce((acc, cv) => {
      acc = acc + cv.starCount;
      return acc;
    }, 0);
    return (totalReviewsCount ? totalReviewsCount / reviews.length : 0).toFixed(1);
  };

export function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }  