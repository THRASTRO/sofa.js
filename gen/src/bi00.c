/* Generate Test Data for bi00 */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{

  printf("var bi00_results = [\n");

  double res0 = {0};
  double res1 = {0};
  double res2 = {0};
  printf("  [");
  iauBi00(&res0, &res1, &res2);
  printf("%.28e", res0);
  printf(", ");
  printf("%.28e", res1);
  printf(", ");
  printf("%.28e", res2);
  printf("  ],\n");


  printf("];\n");
}
