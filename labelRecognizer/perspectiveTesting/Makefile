CC=gcc
CXX=g++ -std=c++0x
RM=rm 
LDLIBS= -L `pkg-config --cflags --libs opencv`

SRCS=perspective.cpp
OBJS=$(subst .cpp,.o,$(SRCS))

all: perspective 

perspective: $(OBJS)
	$(CXX) -o perspective $(OBJS) $(LDLIBS) 

clean:
	$(RM) $(OBJS)
