import threading


class DistributedThreadTask(threading.Thread):
    def __init__(self, **kwargs):
        '''
        Distributed Thread Task creates a threaded task for the inserted function
        Parameters:
        -----------
        name: str - name of the task used for debugging
        task: function - the function to be executed in another thread
        args: tuple - the arguments of the function to be executed
        '''
        super(DistributedThreadTask, self).__init__()
        self.name = kwargs.get('name')
        self.task = kwargs.get('task')
        self.args = kwargs.get('args')

    def run(self):
        '''
        overridden function that starts when self.start executes,
        this function contains the actual execution of the thread task
        '''
        if self.args != None:
            self.task(*self.args)
        else:
            self.task()

    def editArgument(self, args: tuple):
        '''
        edits the args of the task

        Parameters:
        -----------
        args: tuple - has the new parameters of the task
        '''
        self.args = args


class Queue():
    def __init__(self, name):
        self.storage = []
        self.dPushTask = DistributedThreadTask(name, self.__push)
        self.dPopTask = DistributedThreadTask(name, self.__pop)
        self.mutex = None  # @TODO to be added

    def push(self, ele):
        self.dPushTask.editArgument((ele))
        self.dPushTask.run()

    def pop(self):
        self.dPopTask.run()

    def __push(self, ele, mutex):
        pass

    def __pop(self, mutex):
        pass
